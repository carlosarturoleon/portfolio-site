from django.contrib import admin
from django.utils.html import format_html
from .models import ContactInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    """Admin interface for managing contact inquiries."""

    list_display = [
        'name',
        'email',
        'company',
        'services_display',
        'budget_indicator',
        'priority_indicator',
        'timeline',
        'status',
        'created_at',
    ]

    list_filter = [
        'status',
        'budget_range',
        'timeline',
        'priority_level',
        'industry',
        'company_size',
        'created_at',
    ]

    search_fields = [
        'name',
        'email',
        'phone',
        'company',
        'project_goals',
        'current_situation',
        'referral_source',
    ]

    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone', 'company', 'preferred_contact_method')
        }),
        ('Company/Role Details', {
            'fields': ('company_size', 'role', 'industry'),
            'classes': ('collapse',)
        }),
        ('Project Details', {
            'fields': (
                'services_interested',
                'project_goals',
                'current_situation',
                'budget_range',
                'timeline',
                'priority_level',
                'referral_source'
            )
        }),
        ('Status & Management', {
            'fields': ('status', 'notes')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def services_display(self, obj):
        """Display services as comma-separated list."""
        if obj.services_interested:
            return ', '.join(obj.services_interested)
        return '-'
    services_display.short_description = 'Services'

    def budget_indicator(self, obj):
        """Display budget with color coding for high-value leads."""
        if obj.is_high_value:
            return format_html(
                '<span style="color: green; font-weight: bold;">💰 {}</span>',
                obj.get_budget_range_display()
            )
        return obj.get_budget_range_display()
    budget_indicator.short_description = 'Budget Range'
    budget_indicator.admin_order_field = 'budget_range'

    def priority_indicator(self, obj):
        """Display priority with color coding."""
        if not obj.priority_level:
            return '-'

        colors = {
            'high': 'red',
            'medium': 'orange',
            'low': 'gray',
        }
        icons = {
            'high': '🔴',
            'medium': '🟡',
            'low': '⚪',
        }

        return format_html(
            '<span style="color: {};">{} {}</span>',
            colors.get(obj.priority_level, 'black'),
            icons.get(obj.priority_level, ''),
            obj.get_priority_level_display()
        )
    priority_indicator.short_description = 'Priority'
    priority_indicator.admin_order_field = 'priority_level'
