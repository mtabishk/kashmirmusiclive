import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/pages/recent_updates/widgets/info_card.dart';

class UpdateCardsLargeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            InfoCard(
              reviewType: "ALBUM",
              reviewBy: "Kashmiri Music Live",
              title:
                  "Where the Kashmiri rapper’s debut album was a fist-waving call to arms, Azli is a desolate post-mortem of a revolution stalled.",
              subtitle: "7",
              imageUrl: "assets/images/azli_album_art.jpg",
              onTap: () {},
            ),
          ],
        ),
        SizedBox(
          height: _width / 64,
        ),
        Row(
          children: [
            InfoCard(
              reviewType: "SONG",
              reviewBy: "Kashmiri Music Live",
              title: "Kashmir Song in KEEF album exclusive review",
              subtitle: "7",
              imageUrl: "assets/images/keef_album_art.jpg",
              onTap: () {},
            ),
          ],
        ),
        SizedBox(
          height: _width / 64,
        ),
        Row(
          children: [
            InfoCard(
              reviewType: "SONG",
              reviewBy: "Kashmiri Music Live",
              title: "Rides in progress",
              subtitle: "7",
              imageUrl: "assets/images/keef_album_art.jpg",
              onTap: () {},
            ),
          ],
        ),
        SizedBox(
          height: _width / 64,
        ),
        Row(
          children: [
            InfoCard(
              reviewType: "SONG",
              reviewBy: "Kashmiri Music Live",
              title: "Rides in progress",
              subtitle: "7",
              imageUrl: "assets/images/azli_album_art.jpg",
              onTap: () {},
            ),
          ],
        ),
        SizedBox(
          height: _width / 64,
        ),
      ],
    );
  }
}
