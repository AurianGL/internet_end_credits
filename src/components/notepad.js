import React from 'react';
import PropTypes from 'prop-types'


// export default class NotePad extends React.Component {
//   state
// }

export default function NotePad({content, close}) {
  return (
    <React.Fragment>
      <div className="notepad">
        {content}
        <button
          onClick={close}
        >
         close text
         </button>
      </div>
    </React.Fragment>
  )
}

NotePad.propTypes = {
  content: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
}