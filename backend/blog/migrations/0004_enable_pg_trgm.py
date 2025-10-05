# Generated manually for pg_trgm extension

from django.contrib.postgres.operations import TrigramExtension
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_post_blog_post_is_publ_412f67_idx_and_more'),
    ]

    operations = [
        TrigramExtension(),
    ]
