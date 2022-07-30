const rootRoute = "/";

const recentUpdatesPageDisplayName = "Recent Updates";
const recentUpdatesPageRoute = "/recentUpdates";

const lyricsPageDisplayName = "Lyrics";
const lyricsPageRoute = "/lyrics";

const reviewsPageDisplayName = "Reviews";
const reviewsPageRoute = "/reviews";

const authenticationPageDisplayName = "Log out";
const authenticationPageRoute = "/auth";

class MenuItem {
  final String name;
  final String route;

  MenuItem(this.name, this.route);
}

List<MenuItem> sideMenuItemRoutes = [
  MenuItem(recentUpdatesPageDisplayName, recentUpdatesPageRoute),
  MenuItem(lyricsPageDisplayName, lyricsPageRoute),
  MenuItem(reviewsPageDisplayName, reviewsPageRoute),
  MenuItem(authenticationPageDisplayName, authenticationPageRoute),
];
