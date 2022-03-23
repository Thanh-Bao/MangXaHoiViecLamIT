import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import ReactImageGallery from 'react-image-gallery';


class Gallery extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            showIndex: false,
            showBullets: true,
            infinite: true,
            showThumbnails: true,
            showFullscreenButton: true,
            showGalleryFullscreenButton: this.props.showGalleryFullscreenButton || true ,
            showPlayButton: true,
            showGalleryPlayButton: true,
            showNav: true,
            isRTL: false,
            slideDuration: 450,
            slideInterval: 2000,
            slideOnThumbnailOver: false,
            thumbnailPosition: 'bottom',
            showVideo: {},
            useWindowKeyDown: true,
        };
     }

    _onImageClick(event) {
        console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
    }

    _onImageLoad(event) {
        console.debug('loaded image', event.target.src);
    }

    _onSlide(index) {
        this._resetVideo();
        console.debug('slid to index', index);
    }

    _onPause(index) {
        console.debug('paused on index', index);
    }

    _onScreenChange(fullScreenElement) {
        console.debug('isFullScreen?', !!fullScreenElement);
    }

    _onPlay(index) {
        console.debug('playing from index', index);
    }

    _handleInputChange(state, event) {
        if (event.target.value > 0) {
            this.setState({[state]: event.target.value});
        }
    }

    _handleCheckboxChange(state, event) {
        this.setState({[state]: event.target.checked});
    }

    _handleThumbnailPositionChange(event) {
        this.setState({thumbnailPosition: event.target.value});
    }

    _resetVideo() {
        this.setState({showVideo: {}});

        if (this.state.showPlayButton) {
            this.setState({showGalleryPlayButton: true});
        }

        if (this.state.showFullscreenButton) {
            this.setState({showGalleryFullscreenButton: true});
        }
    }

    _toggleShowVideo(url) {
        this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);

        this.setState({
            showVideo: this.state.showVideo
        });

        if (this.state.showVideo[url]) {
            if (this.props.showPlayButton) {
                this.setState({ showGalleryPlayButton: false});
            }

            if (this.props.showFullscreenButton) {
                this.setState({ showGalleryFullscreenButton: false});
            }
        }
    }

    _renderVideo(item) {
        return (
            <div>
                <div className='video-wrapper'>
                    <a
                        className='close-video'
                        onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                    >
                    </a>
                        <iframe
                            width='100%'
                            height='450px'
                            src={item.embedUrl}
                            frameBorder='0'
                            allowFullScreen
                        >
                        </iframe>
                </div>
            </div>
        );
    }
    render() {
        const items = _.map(this.props.items, item => {
            if(item.embedUrl) {
                return {
                    ...item,
                    renderItem: this._renderVideo.bind(this)
                }
            }
            else { 
                return item
            }
        });

        return (
            <ReactImageGallery
                ref={i => this._imageGallery = i}                
                additionalClass="app-image-gallery"
                {...this.props}
                items={items}
                showGalleryFullscreenButton={this.state.showGalleryFullscreenButton}
            />
        )
    }
}

export default Gallery
