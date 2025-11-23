from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import Author, Category, Tag, Post


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'bio_preview', 'created_date', 'updated_date')
    search_fields = ('name', 'email', 'bio')
    list_filter = ('created_date', 'updated_date')
    readonly_fields = ('created_date', 'updated_date')
    ordering = ('name',)

    def bio_preview(self, obj):
        return obj.bio[:50] + '...' if len(obj.bio) > 50 else obj.bio
    bio_preview.short_description = 'Bio'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description_preview', 'created_date', 'updated_date')
    search_fields = ('name', 'description')
    list_filter = ('created_date', 'updated_date')
    readonly_fields = ('created_date', 'updated_date')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)

    def description_preview(self, obj):
        return obj.description[:50] + '...' if len(obj.description) > 50 else obj.description
    description_preview.short_description = 'Description'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_date', 'updated_date')
    search_fields = ('name',)
    list_filter = ('created_date', 'updated_date')
    readonly_fields = ('created_date', 'updated_date')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


@admin.register(Post)
class PostAdmin(MarkdownxModelAdmin):
    list_display = ('title', 'author', 'is_published', 'created_date', 'published_date', 'reading_time')
    list_filter = ('is_published', 'created_date', 'published_date', 'categories', 'author')
    search_fields = ('title', 'content', 'meta_description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('categories', 'tags')
    readonly_fields = ('created_date', 'updated_date')
    date_hierarchy = 'published_date'
    ordering = ('-published_date',)

    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'content', 'author')
        }),
        ('Taxonomy', {
            'fields': ('categories', 'tags')
        }),
        ('Metadata', {
            'fields': ('featured_image', 'meta_description', 'reading_time')
        }),
        ('Publishing', {
            'fields': ('is_published', 'published_date', 'created_date', 'updated_date')
        }),
    )

    class Media:
        css = {
            'all': ('admin/css/blog_admin.css',)
        }


