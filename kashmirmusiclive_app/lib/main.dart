import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/constants/style.dart';
import 'package:kashmirmusiclive_app/controllers/menu_controller.dart';
import 'package:kashmirmusiclive_app/controllers/navigation_controller.dart';
import 'package:kashmirmusiclive_app/layout.dart';
import 'package:kashmirmusiclive_app/pages/404/error.dart';
import 'package:kashmirmusiclive_app/pages/authentication/authentication.dart';
import 'package:kashmirmusiclive_app/routing/routes.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_strategy/url_strategy.dart';

void main() async {
  setPathUrlStrategy();
  Get.put(MenuController());
  Get.put(NavigationController());
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      initialRoute: authenticationPageRoute,
      unknownRoute: GetPage(
          name: '/not-found',
          page: () => PageNotFound(),
          transition: Transition.fadeIn),
      getPages: [
        GetPage(name: rootRoute, page: () => SiteLayout()),
        GetPage(name: authenticationPageRoute, page: () => AuthenticationPage())
      ],
      debugShowCheckedModeBanner: false,
      title: "Kashmir Music Live",
      theme: ThemeData(
        scaffoldBackgroundColor: light,
        textTheme: GoogleFonts.robotoCondensedTextTheme(
          Theme.of(context).textTheme,
        ),
        primarySwatch: Colors.red,
        pageTransitionsTheme: PageTransitionsTheme(builders: {
          TargetPlatform.iOS: FadeUpwardsPageTransitionsBuilder(),
          TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
        }),
        primaryColor: Colors.red,
      ),
    );
  }
}
