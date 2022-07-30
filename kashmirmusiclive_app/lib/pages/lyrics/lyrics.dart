import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/constants/controllers.dart';
import 'package:kashmirmusiclive_app/helpers/responsive.dart';
import 'package:kashmirmusiclive_app/pages/lyrics/widgets/lyrics_table.dart';
import 'package:kashmirmusiclive_app/widgets/custom_text.dart';
import 'package:get/get.dart';

class LyricsPage extends StatelessWidget {
  const LyricsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Obx(
            () => Row(
              children: [
                Container(
                    margin: EdgeInsets.only(
                        top: ResponsiveWidget.isSmallScreen(context) ? 56 : 6),
                    child: CustomText(
                      text: menuController.activeItem.value,
                      size: 24,
                      weight: FontWeight.bold,
                    )),
              ],
            ),
          ),
          SizedBox(height: 16.0),
          Expanded(child: LyricsTable())
        ],
      ),
    );
  }
}
