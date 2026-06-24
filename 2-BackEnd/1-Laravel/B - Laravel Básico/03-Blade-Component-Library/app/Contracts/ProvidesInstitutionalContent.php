<?php

namespace App\Contracts;

interface ProvidesInstitutionalContent
{
    /**
     * @return array<string, mixed>
     */
    public function getSiteMeta(): array;

    /**
     * @return array<int, \App\Models\NavItem>
     */
    public function getNavigation(): array;

    /**
     * @return array<int, \App\Models\ServiceFeature>
     */
    public function getServices(): array;

    /**
     * @return array<int, \App\Models\Metric>
     */
    public function getMetrics(): array;

    /**
     * @return array<int, \App\Models\Testimonial>
     */
    public function getTestimonials(): array;

    /**
     * @return array<int, \App\Models\ContactChannel>
     */
    public function getContactChannels(): array;
}
