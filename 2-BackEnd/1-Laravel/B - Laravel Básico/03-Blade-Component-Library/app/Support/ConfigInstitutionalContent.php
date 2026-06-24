<?php

namespace App\Support;

use App\Contracts\ProvidesInstitutionalContent;
use App\Models\ContactChannel;
use App\Models\Metric;
use App\Models\NavItem;
use App\Models\ServiceFeature;
use App\Models\Testimonial;

class ConfigInstitutionalContent implements ProvidesInstitutionalContent
{
    public function getSiteMeta(): array
    {
        return config('site.meta', []);
    }

    public function getNavigation(): array
    {
        return array_map(
            static fn (array $item) => new NavItem(
                label: $item['label'],
                routeName: $item['route_name'],
                href: $item['href'],
                primary: $item['primary'] ?? false,
            ),
            config('site.navigation', [])
        );
    }

    public function getServices(): array
    {
        return array_map(
            static fn (array $service) => new ServiceFeature(
                title: $service['title'],
                description: $service['description'],
                highlight: $service['highlight'],
                bullets: $service['bullets'],
            ),
            config('site.services', [])
        );
    }

    public function getMetrics(): array
    {
        return array_map(
            static fn (array $metric) => new Metric(
                value: $metric['value'],
                label: $metric['label'],
                description: $metric['description'],
            ),
            config('site.metrics', [])
        );
    }

    public function getTestimonials(): array
    {
        return array_map(
            static fn (array $testimonial) => new Testimonial(
                quote: $testimonial['quote'],
                author: $testimonial['author'],
                role: $testimonial['role'],
            ),
            config('site.testimonials', [])
        );
    }

    public function getContactChannels(): array
    {
        return array_map(
            static fn (array $channel) => new ContactChannel(
                label: $channel['label'],
                value: $channel['value'],
                href: $channel['href'],
                availability: $channel['availability'],
            ),
            config('site.contact_channels', [])
        );
    }
}
