import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="pull-right">
                    Free Trial 25 Days of <strong>30 Days</strong> Remaining.
                    {/*10GB of <strong>250GB</strong> Free.*/}
                </div>
                <div>
                    <strong>Copyright</strong> BeyondiT &copy; 2016-2017
                </div>
            </div>
        )
    }
}

export default Footer