import React from "react";
import PropTypes from "prop-types";
import ImageGallery from 'react-image-gallery';
import imageUnavailable from '../../../public/bundles/images/imgIndisponivel.png'
import image_video from '../../../public/bundles/images/video_default.png'
//https://github.com/xiaolin/react-image-gallery

export default class InternalSlide extends React.Component {

    constructor() {
        super()
        this.state = {
            showFullscreenButton: true,
            showGalleryFullscreenButton: true,
            showPlayButton: true,
            showGalleryPlayButton: true,
            showVideo: {},
        }
    }

    _resetVideo() {
        this.setState({showVideo: {}})

        if (this.state.showPlayButton) {
            this.setState({showGalleryPlayButton: true})
        }

        if (this.state.showFullscreenButton) {
            this.setState({showGalleryFullscreenButton: true})
        }
    }

    _toggleShowVideo(url) {
        this.state.showVideo[url] = !this.state.showVideo[url]
        this.setState({
            showVideo: this.state.showVideo
        });

        if (this.state.showVideo[url]) {
            if (this.state.showPlayButton) {
                this.setState({showGalleryPlayButton: false})
            }

            if (this.state.showFullscreenButton) {
                this.setState({showGalleryFullscreenButton: false})
            }
        }
    }

    _renderVideo(item) {
        return (
            <div className='image-gallery-image'>
                {
                    this.state.showVideo[item.embedUrl] ?
                        <div className='video-wrapper'>
                            <a
                                className='close-video'
                                onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                            />
                        <iframe
                            width='100%'
                            height='390px'
                            maxHeight='400px'
                            src={item.embedUrl}
                            frameBorder='0'
                            allowFullScreen
                        />
                        </div>
                        :
                        <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                            <div className='play-button'></div>
                        <img src={item.original}/>
                        {
                            item.description &&
                                <span
                                    className='image-gallery-description'
                                    style={{right: '0', left: 'initial'}}
                                >
                                    {item.description}
                                </span>
                        }
                    </a>
                }
            </div>
        );
    }


    mountMediaSlide(medias,isImage){
        const mountMedia = (medias).map((media) => {
            let original_media = media.slide
            let thumbnail_media = media.slide
            if(!isImage){
                return {
                    "original": image_video,
                    "thumbnail": image_video,
                    "embedUrl": media.video,
                    "renderItem": this._renderVideo.bind(this),
                }
            } else {
                return {
                    "original": original_media,
                    "thumbnail": thumbnail_media,
                }
            }
        })
        return mountMedia
    }

    getMedias(){
        let images = this.mountMediaSlide(this.props.medias_images, true)
        let videos = this.mountMediaSlide(this.props.medias_videos, false)
        let medias = images.concat(videos)

        if(medias.length > 0){
            return medias
        } else {
            return [{"original": imageUnavailable, "thumbnail": imageUnavailable}]
        }
    }

    render() {
        return (
            <ImageGallery
                slideOnThumbnailHover={true}
                items={this.getMedias()}
                slideInterval={5000}
                showPlayButton={false}
            />
        )
    }
}

InternalSlide.propTypes = {
    medias_images: PropTypes.array.isRequired,
    medias_videos: PropTypes.array.isRequired,
}
