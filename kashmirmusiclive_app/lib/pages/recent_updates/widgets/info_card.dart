import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/constants/style.dart';

class InfoCard extends StatelessWidget {
  final String reviewType; // SONG, ALBUM
  final String title;
  final String? subtitle;
  final String reviewBy;
  final String imageUrl;
  final Function() onTap;

  const InfoCard({
    Key? key,
    required this.reviewType,
    required this.title,
    this.subtitle,
    required this.reviewBy,
    required this.imageUrl,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width;
    double _height = MediaQuery.of(context).size.height;
    return Expanded(
      child: InkWell(
        onTap: onTap,
        child: Container(
          height: _width / 4.0,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                  offset: Offset(0, 6),
                  color: lightGrey.withOpacity(.1),
                  blurRadius: 12)
            ],
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              SizedBox(
                height: _width / 4.0,
                width: _width / 4.0,
                child: Image.asset(
                  imageUrl,
                  fit: BoxFit.fill,
                ),
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(
                      vertical: _width / 40.0, horizontal: _width / 20.0),
                  child: Container(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: EdgeInsets.only(
                            bottom: 0.5, // Space between underline and text
                          ),
                          decoration: BoxDecoration(
                              border: Border(
                                  bottom: BorderSide(
                            color: active,
                            width: 2.0, // Underline thickness
                          ))),
                          child: Text(
                            "$reviewType " + "REVIEW",
                            style: TextStyle(
                              fontSize: 16,
                              color: dark,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        SizedBox(height: _width / 50.0),
                        Text("$title",
                            style: TextStyle(
                              fontSize: _width / 45.0,
                              color: dark,
                              fontWeight: FontWeight.bold,
                            )),
                        SizedBox(height: _width / 50.0),
                        Text("BY ${reviewBy.toUpperCase()}\n",
                            style: TextStyle(
                              fontSize: 16,
                              color: dark,
                              fontWeight: FontWeight.bold,
                            )),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
