"""
EquipNet India — Equipment Routes
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Equipment

equipment_bp = Blueprint('equipment', __name__)


@equipment_bp.route('/equipment', methods=['GET'])
def get_equipment():
    query = Equipment.query

    location = request.args.get('location')
    if location:
        query = query.filter_by(location=location)

    usage_type = request.args.get('type')
    if usage_type:
        query = query.filter_by(usage_type=usage_type)

    availability = request.args.get('availability')
    if availability:
        query = query.filter_by(availability_status=availability)

    search = request.args.get('search')
    if search:
        search_filter = f'%{search}%'
        query = query.filter(
            db.or_(
                Equipment.name.ilike(search_filter),
                Equipment.description.ilike(search_filter),
                Equipment.institution.ilike(search_filter)
            )
        )

    equipment = query.all()
    return jsonify([e.to_dict() for e in equipment]), 200


@equipment_bp.route('/equipment/<int:id>', methods=['GET'])
def get_equipment_by_id(id):
    equipment = Equipment.query.get_or_404(id)
    return jsonify(equipment.to_dict()), 200


@equipment_bp.route('/equipment', methods=['POST'])
@jwt_required()
def create_equipment():
    identity = get_jwt_identity()
    if identity['role'] not in ['Admin', 'Institution']:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    equipment = Equipment(
        name=data.get('name', ''),
        description=data.get('description', ''),
        institution=data.get('institution', ''),
        location=data.get('location', ''),
        availability_status=data.get('availabilityStatus', 'Available'),
        usage_type=data.get('usageType', ''),
        image=data.get('image', '')
    )

    db.session.add(equipment)
    db.session.commit()
    return jsonify(equipment.to_dict()), 201


@equipment_bp.route('/equipment/<int:id>', methods=['PUT'])
@jwt_required()
def update_equipment(id):
    identity = get_jwt_identity()
    if identity['role'] not in ['Admin', 'Institution']:
        return jsonify({'error': 'Unauthorized'}), 403

    equipment = Equipment.query.get_or_404(id)
    data = request.get_json()

    equipment.name = data.get('name', equipment.name)
    equipment.description = data.get('description', equipment.description)
    equipment.institution = data.get('institution', equipment.institution)
    equipment.location = data.get('location', equipment.location)
    equipment.availability_status = data.get('availabilityStatus', equipment.availability_status)
    equipment.usage_type = data.get('usageType', equipment.usage_type)
    equipment.image = data.get('image', equipment.image)

    db.session.commit()
    return jsonify(equipment.to_dict()), 200


@equipment_bp.route('/equipment/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_equipment(id):
    identity = get_jwt_identity()
    if identity['role'] != 'Admin':
        return jsonify({'error': 'Unauthorized'}), 403

    equipment = Equipment.query.get_or_404(id)
    db.session.delete(equipment)
    db.session.commit()
    return jsonify({'success': True}), 200
