import click


def execute():

	click.secho(
		"Hospitality domain is moved to a separate app and will be removed from Next GEN in version-14.\n"
		"When upgrading to Next GEN version-14, please install the app to continue using the Hospitality domain: https://github.com/frappe/hospitality",
		fg="yellow",
	)
