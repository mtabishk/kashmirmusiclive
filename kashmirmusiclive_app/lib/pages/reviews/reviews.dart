import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/constants/controllers.dart';
import 'package:kashmirmusiclive_app/helpers/responsive.dart';
import 'package:kashmirmusiclive_app/widgets/custom_text.dart';
import 'package:get/get.dart';

class ReviewsPage extends StatelessWidget {
  const ReviewsPage({Key? key}) : super(key: key);

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
          Expanded(
              child: ListView(
            children: [
              // if (ResponsiveWidget.isLargeScreen(context) ||
              //     ResponsiveWidget.isMediumScreen(context))
              //   if (ResponsiveWidget.isCustomSize(context))
              //     OverviewCardsMediumScreen()
              //   else
              //     OverviewCardsLargeScreen()
              // else
              //   OverviewCardsSmallScreen(),
              // if (!ResponsiveWidget.isSmallScreen(context))
              //   RevenueSectionLarge()
              // else
              //   RevenueSectionSmall(),

              //   AvailableDriversTable(),
            ],
          ))
        ],
      ),
    );
  }
}
