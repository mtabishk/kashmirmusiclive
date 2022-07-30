import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/constants/controllers.dart';
import 'package:kashmirmusiclive_app/routing/router.dart';
import 'package:kashmirmusiclive_app/routing/routes.dart';

Navigator localNavigator() => Navigator(
      key: navigationController.navigatorKey,
      onGenerateRoute: generateRoute,
      initialRoute: recentUpdatesPageRoute,
    );
