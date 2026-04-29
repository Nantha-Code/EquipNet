"""
EquipNet India — Flask Application Entry Point
"""
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db
from routes.auth import auth_bp
from routes.equipment import equipment_bp
from routes.requests import requests_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=['http://localhost:5173', 'http://localhost:3000'])
    JWTManager(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(equipment_bp, url_prefix='/api')
    app.register_blueprint(requests_bp, url_prefix='/api')

    # Create tables
    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
