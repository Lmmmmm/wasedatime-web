import React from 'react';
import styled from 'styled-components';
import chunk from 'lodash/chunk';
import WayPoint from 'react-waypoint';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import CourseChunk from './CourseChunk';
import { sizes } from '../../utils/styledComponents';
import { Overlay } from '../../styled-components/Overlay';
import { Wrapper } from '../../styled-components/Wrapper';

const ExtendedOverlay = Overlay.extend`
  flex-direction: row;
`;

const CourseListWrapper = Wrapper.extend`
  flex: 1 1 0;
  padding: 0 1em 1em 1em;
`;

// const Menu = styled('div')`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   margin: 5px 0px;
// `
const SideBar = styled('div')`
  flex: 0 0 19em;
  background-color: white;
`

const getChunkKey = chunk => {
  const head = chunk[0];
  const tail = chunk[chunk.length - 1];
  return `${head._id}-${tail._id}`;
}

const COURSES_PER_CHUNK = 5;
const INIT_CHUNKS_NUM = 2;

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedChunksNum: INIT_CHUNKS_NUM
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({
        loadedChunksNum: INIT_CHUNKS_NUM
      })
      window.scrollTo({top: 0})
    }
  }

  resultsToChunks = () => (
    chunk(this.props.results, COURSES_PER_CHUNK).slice(0, this.state.loadedChunksNum)
  )

  loadMoreChunks = index => {
    if (index !== 0 &&
      index + 1 === this.state.loadedChunksNum) {
      this.setState((prevState, props) => {
        return {
          loadedChunksNum: prevState.loadedChunksNum + 1
        }
      })
    }
  }

  render() {
   const { searchTerm, results } = this.props
   const resultsInChunks = this.resultsToChunks();
    return (
      <Wrapper>
        <ExtendedOverlay>
          <CourseListWrapper>
            {/* <Menu>
              Menu
            </Menu> */}
            <div>
              {resultsInChunks.length ?
                resultsInChunks.map((chunk, index) => (
                  <WayPoint
                    key={getChunkKey(chunk)}
                    onEnter={() => {this.loadMoreChunks(index)}}
                  >
                    <div>
                      <div>
                        <span>
                          {`${index * 5 + 1}-${index * 5 + 5} of ${results.length} courses`}
                        </span>
                      </div>
                      <CourseChunk chunk={chunk} searchTerm={searchTerm} />
                    </div>
                  </WayPoint>
                )) :
                <div>
                  No results
                </div>
              }
            </div>
          </CourseListWrapper>
          <MediaQuery minWidth={sizes.desktop}>
            {matches => (
              matches &&
                <SideBar>
                  Course Filter under construction
                </SideBar>
            )}
          </MediaQuery>
        </ExtendedOverlay>
      </Wrapper>
    );
  };
}

export default CourseList;

CourseList.propTypes = {
  searchTerm: PropTypes.string.isRequired
};
