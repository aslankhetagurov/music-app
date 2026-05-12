import styles from './AppLoader.module.scss';
import logo from '/logo.webp';

const AppLoader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loader__wrapper}>
                <img
                    className={styles.loader__img}
                    src={logo}
                    alt="LolMusic logo"
                    width={100}
                    height={100}
                />
                <div className={styles.loader__wave}></div>
            </div>
        </div>
    );
};

export default AppLoader;
