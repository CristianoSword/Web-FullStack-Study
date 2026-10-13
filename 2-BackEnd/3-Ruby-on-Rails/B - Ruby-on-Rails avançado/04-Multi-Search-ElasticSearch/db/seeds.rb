engineering = TopicTag.find_or_create_by!(slug: "engineering") do |tag|
  tag.label = "Engineering"
end

architecture = TopicTag.find_or_create_by!(slug: "architecture") do |tag|
  tag.label = "Architecture"
end

api_design = TopicTag.find_or_create_by!(slug: "api-design") do |tag|
  tag.label = "API Design"
end

author = AuthorProfile.find_or_create_by!(slug: "marina-costa") do |profile|
  profile.name = "Marina Costa"
  profile.headline = "Principal Platform Engineer"
  profile.bio = "Builds search-heavy editorial platforms and internal discovery tools."
  profile.location = "Sao Paulo"
  profile.expertise_area = "engineering"
  profile.followers_count = 1240
end

article = ArticleDocument.find_or_create_by!(slug: "elastic-search-for-editorial-content") do |record|
  record.author_profile = author
  record.title = "Elastic search for editorial content"
  record.status = "published"
  record.category = "engineering"
  record.body = "How to combine Rails models, denormalized indexes and fallback SQL querying."
  record.summary = "A practical search pipeline for multi-model content discovery."
  record.reading_time_minutes = 9
  record.views_count = 8300
  record.published_at = Time.current
end

article.topic_tags = [engineering, architecture, api_design]
article.save!
