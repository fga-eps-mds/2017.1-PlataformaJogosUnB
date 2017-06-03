from smartfields.processors import ImageProcessor
from smartfields.dependencies import FileDependency


def image_attribute_resize(attr, width, height):
    processor = ImageProcessor(format="JPEG",
                               scale={
                                   "max_width": width,
                                   "max_height": height
                               }
                               )

    return FileDependency(attname=attr, processor=processor)
