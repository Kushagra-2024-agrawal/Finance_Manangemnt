from flask import Flask, render_template, request, redirect, url_for, session
import mysql.connector

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with your secret key

# Database configuration
db_config = {
    'user': 'new_user',
    'password': 'new_password',
    'host': 'localhost',
    'database': 'financial_info'
}

# Predefined credentials for login
credentials = {
    'Anshuman': '1234'
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if username in credentials and credentials[username] == password:
        session['username'] = username
        return redirect(url_for('dashboard'))
    else:
        error = 'Invalid username or password'
        return render_template('index.html', error=error)

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return render_template('dashboard.html')
    else:
        return redirect(url_for('index'))

@app.route('/user_info', methods=['POST'])
def user_info():
    username = request.form['username']
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM person_financials WHERE name = %s", (username,))
    user_data = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if user_data:
        return render_template('templates.html', user_data=user_data)
    else:
        return "User not found", 404

if __name__ == '__main__':
    app.run(debug=True)