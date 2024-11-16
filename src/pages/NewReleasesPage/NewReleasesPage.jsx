import NewReleasesList from '../../components/NewReleasesList/NewReleasesList';
import './NewReleasesPage.scss';

const NewReleasesPage = () => {
    return (
        <div className="new-releases-page">
            <h1 className="new-releases-page__title">New Releases</h1>
            <NewReleasesList />
        </div>
    );
};

export default NewReleasesPage;
