# Development

## Updating the ACM Blueprint Export

### Importing

1. Create a fresh site in Local or use the FakerPress plugin to wipe your current WordPress database to a fresh install.
2. Install and activate Atlas Content Modeler and Faust. With WP CLI: `wp install --activate atlas-content-modeler faustwp`
3. Run `wp acm reset --yes --all` to remove default published WordPress posts and pages.
4. Run `wp acm blueprint import https://github.com/wpengine/atlas-blueprint-portfolio/raw/main/acm-blueprint.zip`

This will import the ACM Blueprint export into your WordPress database. Make any modifications as necessary.

### Exporting

1. Before exporting, make sure you have deleted any of the initial content that gets created upon a WordPress install (e.g. "Sample Page", "Hello World", any comments, etc.)
2. Switch to the Twenty Twenty-Three theme: `wp theme activate twentytwentythree`.
3. From the WP CLI, run `wp acm blueprint export --open --min-wp=5.9.2 --min-acm=0.15.0 --wp-options=category_base,permalink_structure,nav_menu_options,theme_mods_twentytwentythree,current_theme,stylesheet,template --post-types=nav_menu_item,post,page,testimonial,project`. This will export the site into the appropriate ACM Blueprint .zip, and also open the location where the .zip was saved. It will also export the Navigational Menus and the CPTs from the ACM models.
4. Replace the existing `acm-blueprint.zip` in the repo with the newly exported `acm-blueprint.zip` and make a PR with the changes.
