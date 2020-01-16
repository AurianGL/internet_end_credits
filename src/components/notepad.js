import React from 'react';
import PropTypes from 'prop-types'


// export default class NotePad extends React.Component {
//   state
// }

export default function NotePad({content}) {
  return (
    <React.Fragment>
      <div>
        {content}
      </div>
    </React.Fragment>
  )
}

NotePad.propTypes = {
  content: PropTypes.string.isRequired,
}