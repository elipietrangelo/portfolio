---
layout: mywork
title: My work
eleventyComputed:   
    metaDescription: Elisa Pietrangelo's projects falling under the {{ tag }} category 
pagination:
    data: collections.videoTagList
    size: 1
    alias: tag
permalink: /projects/{{ tag | slug }}/
---