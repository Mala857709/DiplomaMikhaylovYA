from django.db import migrations

class Migration(migrations.Migration):

    
    operations = [
        migrations.RunSQL(
            sql="""
            CREATE TABLE IF NOT EXISTS process_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME NOT NULL,
                pressure REAL NOT NULL,
                humidity REAL NOT NULL,
                equipment_temp REAL NOT NULL,
                working_zone_temp REAL NOT NULL,
                co2_level REAL NOT NULL
            );
            """,
            reverse_sql="DROP TABLE IF EXISTS process_data;"
        )
    ]