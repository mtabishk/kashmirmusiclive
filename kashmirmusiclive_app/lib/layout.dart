import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/helpers/local_navigator.dart';
import 'package:kashmirmusiclive_app/helpers/responsive.dart';
import 'package:kashmirmusiclive_app/widgets/large_screen.dart';
import 'package:kashmirmusiclive_app/widgets/side_menu.dart';
import 'package:kashmirmusiclive_app/widgets/top_nav.dart';

class SiteLayout extends StatelessWidget {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      extendBodyBehindAppBar: false,
      appBar: topNavigationBar(context, scaffoldKey),
      drawer: ResponsiveWidget.isSmallScreen(context)
          ? Drawer(
              child: SideMenu(),
            )
          : null,
      body: ResponsiveWidget(
          largeScreen: LargeScreen(),
          smallScreen: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: localNavigator(),
          )),
    );
  }
}
