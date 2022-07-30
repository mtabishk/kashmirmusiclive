import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/helpers/responsive.dart';
import 'package:kashmirmusiclive_app/widgets/horizontal_menu.dart';
import 'package:kashmirmusiclive_app/widgets/vertical_menu.dart';

class SideMenuItem extends StatelessWidget {
  final String itemName;
  final Function() onTap;

  const SideMenuItem({Key? key, required this.itemName, required this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (ResponsiveWidget.isCustomSize(context)) {
      return VerticalMenuItem(
        itemName: itemName,
        onTap: onTap,
      );
    } else {
      return HorizontalMenuItem(
        itemName: itemName,
        onTap: onTap,
      );
    }
  }
}
