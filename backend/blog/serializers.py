from rest_framework import serializers
from .models import Post, Subscriber, Author, Category, Tag


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer for Author model"""
    class Meta:
        model = Author
        fields = ['id', 'name', 'bio', 'email', 'profile_image', 'created_date', 'updated_date']
        read_only_fields = ['created_date', 'updated_date']


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'created_date', 'updated_date']
        read_only_fields = ['created_date', 'updated_date']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Tag model"""
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'created_date', 'updated_date']
        read_only_fields = ['created_date', 'updated_date']


class PostSerializer(serializers.ModelSerializer):
    """Serializer for Post model with nested author, category, and tags"""
    author = AuthorSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    # Write-only fields for creating/updating relationships
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(),
        source='author',
        write_only=True,
        required=False
    )
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='categories',
        many=True,
        write_only=True,
        required=False
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        source='tags',
        many=True,
        write_only=True,
        required=False
    )

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'slug',
            'content',
            'author',
            'author_id',
            'categories',
            'category_ids',
            'tags',
            'tag_ids',
            'created_date',
            'published_date',
            'updated_date',
            'is_published',
            'featured_image',
            'meta_description',
            'reading_time'
        ]
        read_only_fields = ['created_date', 'updated_date']


class SubscriberSerializer(serializers.ModelSerializer):
    """Serializer for Subscriber model"""

    class Meta:
        model = Subscriber
        fields = [
            'id',
            'email',
            'confirmed',
            'confirmation_token',
            'subscribed_date',
            'confirmed_date'
        ]
        read_only_fields = ['id', 'confirmed', 'confirmation_token', 'subscribed_date', 'confirmed_date']
        extra_kwargs = {
            'email': {
                'required': True,
                'allow_blank': False,
                'error_messages': {
                    'required': 'Email address is required.',
                    'blank': 'Email address cannot be blank.',
                    'invalid': 'Please enter a valid email address.'
                }
            }
        }

    def validate_email(self, value):
        """Validate email format and check for duplicates"""
        # Convert to lowercase for consistency
        value = value.lower().strip()

        # Check if email already exists
        if Subscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "This email address is already subscribed to our newsletter."
            )

        return value
