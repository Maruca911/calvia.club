/*
  # Calvia.Club Membership System

  1. New Tables
    - `membership_applications`
      - `id` (uuid, primary key)
      - `full_name` (text) - applicant's full name
      - `email` (text) - contact email
      - `phone` (text) - phone with country code
      - `country_of_residence` (text) - where they live
      - `preferred_language` (text) - de, en, or es
      - `age_range` (text) - selected age bracket
      - `property_status` (text) - own/rent/planning in Calvia
      - `visit_frequency` (text) - how often they visit Mallorca per year
      - `heard_about_us` (text) - referral source
      - `interests` (text[]) - activities they're interested in
      - `preferred_benefits` (text[]) - benefits they value most
      - `wishes` (text) - free text about what they'd like to see
      - `created_at` (timestamptz) - submission timestamp

    - `spots_counter`
      - `id` (int, primary key)
      - `remaining` (int) - spots remaining out of 444
      - `total` (int) - total spots (444)
      - `updated_at` (timestamptz) - last update timestamp

  2. Security
    - RLS enabled on both tables
    - Anonymous users can INSERT applications
    - Anonymous users can SELECT spots_counter (read-only, for the live counter)
    - No public read access to applications (admin only)

  3. Notes
    - spots_counter is seeded with 444 remaining out of 444 total
*/

CREATE TABLE IF NOT EXISTS membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  country_of_residence text NOT NULL DEFAULT '',
  preferred_language text NOT NULL DEFAULT 'de',
  age_range text NOT NULL DEFAULT '',
  property_status text NOT NULL DEFAULT '',
  visit_frequency text NOT NULL DEFAULT '',
  heard_about_us text NOT NULL DEFAULT '',
  interests text[] NOT NULL DEFAULT '{}',
  preferred_benefits text[] NOT NULL DEFAULT '{}',
  wishes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
  ON membership_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS spots_counter (
  id int PRIMARY KEY DEFAULT 1,
  remaining int NOT NULL DEFAULT 444,
  total int NOT NULL DEFAULT 444,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE spots_counter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read spots counter"
  ON spots_counter
  FOR SELECT
  TO anon
  USING (id = 1);

INSERT INTO spots_counter (id, remaining, total) VALUES (1, 444, 444)
ON CONFLICT (id) DO NOTHING;