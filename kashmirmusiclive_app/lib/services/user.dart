import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:kashmirmusiclive_app/helpers/constants.dart';
import 'package:kashmirmusiclive_app/models/user.dart';

class UserService {
  String collection = "users";

  void createUser({
    required String? id,
    required String? name,
    required String? email,
  }) {
    firebaseFirestore.collection(collection).doc(id).set({
      "id": id,
      "name": name,
      "email": email,
    });
  }

  Future<UserModel> getUser(String id) async {
    DocumentSnapshot snapshot =
        await firebaseFirestore.collection(collection).doc(id).get();
    return UserModel.fromSnapshot(snapshot);
  }

  Future<bool> doesUserExist(String id) async {
    DocumentSnapshot snapshot =
        await firebaseFirestore.collection(collection).doc(id).get();
    return snapshot.exists;
  }

  Future<List<UserModel>> getAllUsers() async {
    QuerySnapshot snapshot =
        await firebaseFirestore.collection(collection).get();
    return snapshot.docs.map((doc) => UserModel.fromSnapshot(doc)).toList();
  }
}
