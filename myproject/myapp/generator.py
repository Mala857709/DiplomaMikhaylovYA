import csv
import datetime
import random
import sqlite3
import time
import os

def generation():
    # Путь к базе данных в корне проекта
    db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'db.sqlite3')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Создание таблицы process_data
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS process_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME NOT NULL,
            electricity REAL,
            water REAL,
            heat REAL,
            gas REAL
        )
    """)
    
    # Создание таблицы out_of_range_values (если нужна)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS out_of_range_values (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_exp INTEGER NOT NULL,
            timestamp DATETIME NOT NULL,
            measurement_type TEXT NOT NULL,
            value REAL NOT NULL
        )
    """)
    conn.commit()

    # Директория для CSV файлов
    csv_dir = os.path.join(os.path.dirname(__file__), 'csv_data')
    os.makedirs(csv_dir, exist_ok=True)
    
    data_csv_path = os.path.join(csv_dir, 'data.csv')
    exception_csv_path = os.path.join(csv_dir, 'exception_data.csv')

    fieldnames = ['timestamp', 'electricity', 'water', 'heat', 'gas']
    fieldnamesforexception = ['id', 'timestamp', 'measurement_type', 'value']

    # Создание CSV файлов, если они не существуют
    if not os.path.exists(data_csv_path):
        with open(data_csv_path, mode='w', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()

    if not os.path.exists(exception_csv_path):
        with open(exception_csv_path, mode='w', newline='') as exp_csv_file:
            exp_writer = csv.DictWriter(exp_csv_file, fieldnames=fieldnamesforexception)
            exp_writer.writeheader()

    while True:
        norm_data = {
            'electricity': (100, 500),
            'water': (5, 20),
            'heat': (50, 200),
            'gas': (10, 50)
        }
        
        # Генерация данных с возможными аномалиями
        data = {
            'electricity': round(random.uniform(80, 600), 2),  # Расширен диапазон для аномалий
            'water': round(random.uniform(3, 30), 2),
            'heat': round(random.uniform(40, 250), 2),
            'gas': round(random.uniform(5, 60), 2)
        }

        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Запись в базу данных
        cursor.execute("""
            INSERT INTO process_data 
            (timestamp, electricity, water, heat, gas) 
            VALUES (?, ?, ?, ?, ?)
        """, (timestamp, data['electricity'], data['water'], data['heat'], data['gas']))
        conn.commit()

        cursor.execute('SELECT last_insert_rowid()')
        id_exp = cursor.fetchone()[0]

        # Запись в data.csv
        with open(data_csv_path, mode='a', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writerow({'timestamp': timestamp, **data})

        # Проверка аномалий и запись в exception_data.csv
        with open(exception_csv_path, mode='a', newline='') as exp_csv_file:
            exp_writer = csv.DictWriter(exp_csv_file, fieldnames=fieldnamesforexception)
            for measurement_type, value in data.items():
                if value < norm_data[measurement_type][0] or value > norm_data[measurement_type][1]:
                    exp_writer.writerow({
                        'id': id_exp,
                        'timestamp': timestamp,
                        'measurement_type': measurement_type,
                        'value': value,
                    })
                    cursor.execute("""
                        INSERT INTO out_of_range_values 
                        (id_exp, timestamp, measurement_type, value) 
                        VALUES (?, ?, ?, ?)
                    """, (id_exp, timestamp, measurement_type, value))
                    conn.commit()

        time.sleep(5)

if __name__ == "__main__":
    generation()