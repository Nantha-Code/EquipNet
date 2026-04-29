"""
EquipNet India — Request Routes
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Request

requests_bp = Blueprint('requests', __name__)


@requests_bp.route('/request', methods=['POST'])
@jwt_required()
def create_request():
    identity = get_jwt_identity()
    data = request.get_json()

    new_request = Request(
        user_id=identity['id'],
        equipment_id=data.get('equipmentId'),
        purpose=data.get('purpose', ''),
        start_date=data.get('startDate', ''),
        end_date=data.get('endDate', ''),
        status='Pending'
    )

    db.session.add(new_request)
    db.session.commit()
    return jsonify(new_request.to_dict()), 201


@requests_bp.route('/request/user', methods=['GET'])
@jwt_required()
def get_user_requests():
    identity = get_jwt_identity()
    requests_list = Request.query.filter_by(user_id=identity['id']).all()
    return jsonify([r.to_dict() for r in requests_list]), 200


@requests_bp.route('/request/admin', methods=['GET'])
@jwt_required()
def get_all_requests():
    identity = get_jwt_identity()
    if identity['role'] != 'Admin':
        return jsonify({'error': 'Unauthorized'}), 403

    requests_list = Request.query.all()
    return jsonify([r.to_dict() for r in requests_list]), 200


@requests_bp.route('/request/<int:id>', methods=['PUT'])
@jwt_required()
def update_request_status(id):
    identity = get_jwt_identity()
    if identity['role'] != 'Admin':
        return jsonify({'error': 'Unauthorized'}), 403

    req = Request.query.get_or_404(id)
    data = request.get_json()
    req.status = data.get('status', req.status)

    db.session.commit()
    return jsonify(req.to_dict()), 200
