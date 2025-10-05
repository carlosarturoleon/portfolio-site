from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import Author, Category, Tag, Post, Subscriber


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'bio_preview')
    search_fields = ('name', 'email', 'bio')
    ordering = ('name',)

    def bio_preview(self, obj):
        return obj.bio[:50] + '...' if len(obj.bio) > 50 else obj.bio
    bio_preview.short_description = 'Bio'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description_preview')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)

    def description_preview(self, obj):
        return obj.description[:50] + '...' if len(obj.description) > 50 else obj.description
    description_preview.short_description = 'Description'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


@admin.register(Post)
class PostAdmin(MarkdownxModelAdmin):
    list_display = ('title', 'author', 'is_published', 'published_date', 'reading_time')
    list_filter = ('is_published', 'published_date', 'categories', 'author')
    search_fields = ('title', 'content', 'meta_description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('categories', 'tags')
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
            'fields': ('is_published', 'published_date')
        }),
    )


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'confirmed', 'subscribed_date', 'confirmed_date')
    list_filter = ('confirmed', 'subscribed_date')
    search_fields = ('email',)
    readonly_fields = ('subscribed_date', 'confirmed_date')
    ordering = ('-subscribed_date',)
