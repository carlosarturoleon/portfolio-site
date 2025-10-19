from rest_framework import serializers
from .models import ContactInquiry


class ContactInquirySerializer(serializers.ModelSerializer):
    """Serializer for contact form submissions."""

    class Meta:
        model = ContactInquiry
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'company',
            'preferred_contact_method',
            'company_size',
            'role',
            'industry',
            'services_interested',
            'project_goals',
            'current_situation',
            'budget_range',
            'timeline',
            'priority_level',
            'referral_source',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_services_interested(self, value):
        """Ensure at least one service is selected."""
        if not value or len(value) == 0:
            raise serializers.ValidationError(
                "Please select at least one service you're interested in."
            )
        return value

    def validate_email(self, value):
        """Basic email validation."""
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value.lower()

    def validate_referral_source(self, value):
        """Ensure referral source is provided."""
        if not value or not value.strip():
            raise serializers.ValidationError("Please let us know how you found me.")
        return value
