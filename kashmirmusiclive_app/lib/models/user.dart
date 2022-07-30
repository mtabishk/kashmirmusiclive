import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  static const ID = "id";
  static const NAME = "name";
  static const EMAIL = "email";

  String? _id;
  String? _name;
  String? _email;

  //getters
  String? get id => _id;
  String? get name => _name;
  String? get email => _email;

  UserModel.fromSnapshot(DocumentSnapshot snapshot) {
    _id = snapshot.get(ID);
    _name = snapshot.get(NAME);
    _email = snapshot.get(EMAIL);
  }
}
