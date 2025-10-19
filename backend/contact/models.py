from django.db import models
from django.utils import timezone


class ContactInquiry(models.Model):
    """Model to store contact form submissions from potential clients."""

    SERVICE_CHOICES = [
        ('data_analytics', 'Data Analytics'),
        ('software_development', 'Software Development'),
        ('data_engineering', 'Data Engineering'),
        ('technical_consulting', 'Technical Consulting'),
    ]

    BUDGET_CHOICES = [
        ('under_10k', 'Under $10K'),
        ('10k_25k', '$10K-$25K'),
        ('25k_50k', '$25K-$50K'),
        ('50k_100k', '$50K-$100K'),
        ('over_100k', '$100K+'),
        ('not_determined', 'Not yet determined'),
    ]

    TIMELINE_CHOICES = [
        ('immediate', 'Immediate (within 1 month)'),
        ('1_3_months', '1-3 months'),
        ('3_6_months', '3-6 months'),
        ('6_plus_months', '6+ months'),
        ('exploratory', 'Exploratory'),
    ]

    PRIORITY_CHOICES = [
        ('high', 'High priority'),
        ('medium', 'Medium priority'),
        ('low', 'Low priority'),
    ]

    CONTACT_METHOD_CHOICES = [
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('either', 'Either'),
    ]

    COMPANY_SIZE_CHOICES = [
        ('solo', 'Solo/Individual'),
        ('2_10', '2-10 employees'),
        ('11_50', '11-50 employees'),
        ('51_200', '51-200 employees'),
        ('201_1000', '201-1,000 employees'),
        ('1000_plus', '1,000+ employees'),
    ]

    ROLE_CHOICES = [
        ('founder_ceo', 'Founder/CEO'),
        ('cto_vp_eng', 'CTO/VP Engineering'),
        ('director', 'Director'),
        ('manager', 'Manager'),
        ('analyst', 'Analyst'),
        ('consultant', 'Consultant'),
        ('other', 'Other'),
    ]

    INDUSTRY_CHOICES = [
        ('technology', 'Technology/Software'),
        ('finance', 'Finance/Banking'),
        ('healthcare', 'Healthcare/Medical'),
        ('ecommerce', 'E-commerce/Retail'),
        ('manufacturing', 'Manufacturing'),
        ('consulting', 'Consulting'),
        ('marketing', 'Marketing/Advertising'),
        ('education', 'Education'),
        ('real_estate', 'Real Estate'),
        ('logistics', 'Logistics/Supply Chain'),
        ('energy', 'Energy/Utilities'),
        ('nonprofit', 'Non-profit'),
        ('government', 'Government'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('proposal_sent', 'Proposal Sent'),
        ('closed_won', 'Closed - Won'),
        ('closed_lost', 'Closed - Lost'),
    ]

    # Contact Information
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    company = models.CharField(max_length=200, blank=True, null=True)
    preferred_contact_method = models.CharField(
        max_length=20,
        choices=CONTACT_METHOD_CHOICES,
        blank=True,
        null=True
    )

    # Company/Role Information
    company_size = models.CharField(
        max_length=20,
        choices=COMPANY_SIZE_CHOICES,
        blank=True,
        null=True
    )
    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES,
        blank=True,
        null=True
    )
    industry = models.CharField(
        max_length=50,
        choices=INDUSTRY_CHOICES,
        blank=True,
        null=True
    )

    # Project Details
    services_interested = models.JSONField(
        default=list,
        help_text="Multiple services the client is interested in"
    )
    project_goals = models.TextField(
        help_text="What specific business problem are you trying to solve?"
    )
    current_situation = models.TextField(
        blank=True,
        null=True,
        help_text="What tools or systems are you currently using?"
    )
    budget_range = models.CharField(
        max_length=20,
        choices=BUDGET_CHOICES,
        help_text="Estimated project budget"
    )
    timeline = models.CharField(
        max_length=20,
        choices=TIMELINE_CHOICES,
        help_text="When do you need this project completed?"
    )
    priority_level = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        blank=True,
        null=True,
        help_text="How critical is this project to your business?"
    )
    referral_source = models.CharField(
        max_length=200,
        default='',
        help_text="How did you hear about my services?"
    )

    # Metadata
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new'
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    notes = models.TextField(blank=True, null=True, help_text="Internal notes")

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Inquiry'
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        services = ', '.join(self.services_interested) if self.services_interested else 'No services'
        return f"{self.name} - {services} ({self.created_at.strftime('%Y-%m-%d')})"

    @property
    def is_high_value(self):
        """Identify high-value leads based on budget."""
        return self.budget_range in ['50k_100k', 'over_100k']

    @property
    def is_high_priority(self):
        """Check if this is a high priority lead."""
        return self.priority_level == 'high'
