/*
  # Auto-decrement spots counter on new application

  1. Changes
    - Creates a trigger function `decrement_spots_on_application()`
    - Adds a trigger on `membership_applications` table (AFTER INSERT)
    - When a new application is inserted, the `remaining` column in `spots_counter` is decremented by 1
    - The counter will not go below 0

  2. Important Notes
    - This ensures the live spots counter stays accurate without manual updates
    - The trigger only fires on INSERT, not on UPDATE or DELETE
*/

CREATE OR REPLACE FUNCTION decrement_spots_on_application()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE spots_counter
  SET remaining = GREATEST(remaining - 1, 0),
      updated_at = now()
  WHERE id = 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_decrement_spots'
  ) THEN
    CREATE TRIGGER trg_decrement_spots
    AFTER INSERT ON membership_applications
    FOR EACH ROW
    EXECUTE FUNCTION decrement_spots_on_application();
  END IF;
END $$;
