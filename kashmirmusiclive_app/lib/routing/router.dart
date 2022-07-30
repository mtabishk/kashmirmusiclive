import 'package:flutter/material.dart';
import 'package:kashmirmusiclive_app/pages/lyrics/lyrics.dart';
import 'package:kashmirmusiclive_app/pages/recent_updates/recent_updates.dart';
import 'package:kashmirmusiclive_app/pages/reviews/reviews.dart';
import 'package:kashmirmusiclive_app/routing/routes.dart';

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case recentUpdatesPageRoute:
      return _getPageRoute(RecentUpdatesPage());
    case lyricsPageRoute:
      return _getPageRoute(LyricsPage());
    case reviewsPageRoute:
      return _getPageRoute(ReviewsPage());
    default:
      return _getPageRoute(RecentUpdatesPage());
  }
}

PageRoute _getPageRoute(Widget child) {
  return MaterialPageRoute(builder: (context) => child);
}
