"""
EquipNet India — Database Models
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='Student')
    institution = db.Column(db.String(200), default='')

    requests = db.relationship('Request', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'institution': self.institution
        }


class Equipment(db.Model):
    __tablename__ = 'equipment'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    institution = db.Column(db.String(200))
    location = db.Column(db.String(100))
    availability_status = db.Column(db.String(20), default='Available')
    usage_type = db.Column(db.String(50))
    image = db.Column(db.String(500))

    requests = db.relationship('Request', backref='equipment', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'institution': self.institution,
            'location': self.location,
            'availabilityStatus': self.availability_status,
            'usageType': self.usage_type,
            'image': self.image
        }


class Request(db.Model):
    __tablename__ = 'requests'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    equipment_id = db.Column(db.Integer, db.ForeignKey('equipment.id'), nullable=False)
    purpose = db.Column(db.Text, default='')
    start_date = db.Column(db.String(20), default='')
    end_date = db.Column(db.String(20), default='')
    status = db.Column(db.String(20), default='Pending')
    request_date = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'userName': self.user.name if self.user else '',
            'userEmail': self.user.email if self.user else '',
            'equipmentId': self.equipment_id,
            'equipmentName': self.equipment.name if self.equipment else '',
            'purpose': self.purpose,
            'startDate': self.start_date,
            'endDate': self.end_date,
            'status': self.status,
            'requestDate': self.request_date.isoformat() if self.request_date else ''
        }
