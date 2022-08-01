import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/constants/controllers.dart';
import 'package:kashmirmusiclive_app/helpers/responsive.dart';
import 'package:kashmirmusiclive_app/pages/recent_updates/widgets/update_card_large.dart';
import 'package:kashmirmusiclive_app/pages/recent_updates/widgets/update_card_small.dart';
import 'package:kashmirmusiclive_app/widgets/custom_text.dart';
import 'package:get/get.dart';

class RecentUpdatesPage extends StatelessWidget {
  const RecentUpdatesPage({Key? key}) : super(key: key);

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
          Expanded(
              child: ListView(
            children: [
              if (ResponsiveWidget.isLargeScreen(context) ||
                  ResponsiveWidget.isMediumScreen(context))
                UpdateCardsLargeScreen()
              else
                UpdateCardsSmallScreen(),
              // if (!ResponsiveWidget.isSmallScreen(context))
              //   RevenueSectionLarge()
              // else
              //   RevenueSectionSmall(),
              // AvailableDriversTable(),
            ],
          ))
        ],
      ),
    );
  }
}
