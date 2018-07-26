import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../UI/Navigation/Navigation';
import SwipeUI from '../UI/SwipeUI';
import LoadIf from '../UI/LoadIf';
import PosesFilter from './PoseFilter';
import { SET_SLIDE_INDEX } from '../../store/actions/actionTypes';

function PoseGallery({
  setSlide, match, filterToPoseName, difficulty, tag,
}) {
  let swipeNode = null;
  const next = () => swipeNode.next();
  const prev = () => swipeNode.prev();
  const single = match.params ? match.params.singlePose : null;
  return (
    <PoseGalleryArea>
      <SwipeUI
        reactSwipe={(reactSwipe) => { swipeNode = reactSwipe; }}
        updater={setSlide}
        skip={single}
        key={difficulty + tag + filterToPoseName}
      >
        <PosesFilter />
      </SwipeUI>
      <LoadIf.Desktop>
        <Navigation
          next={next}
          prev={prev}
          skip={single || filterToPoseName}
        />
      </LoadIf.Desktop>
    </PoseGalleryArea>
  );
}

const mapStateToProps = ({ view: { name: filterToPoseName, difficulty, tag } }) => ({ filterToPoseName, difficulty, tag });

const mapDispatchToProps = dispatch => ({
  setSlide: currentSlide => dispatch({
    type: SET_SLIDE_INDEX,
    currentSlide,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PoseGallery);

const PoseGalleryArea = styled.div`
  height: 92vh;
`;