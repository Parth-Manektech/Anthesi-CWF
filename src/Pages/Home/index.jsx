import React from 'react';
import SelectAddress from '../../Components/SelectAddress';

function Home() {
    return (
        <section className="home">
            <div className='homecontainer'>
                <SelectAddress />
            </div>
        </section>
    );
}

export default Home;
