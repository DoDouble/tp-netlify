import styles from './footer.module.css'
import FooterNavigation from "./footerNavigation"

export default function Footer({}) {
    return (
      <footer className={styles.footer}>
        <div className='flex justify-between items-center'>
            <FooterNavigation />
            <div className='grow text-right'>
                &copy; 2024 Acme Engineering Co.
            </div>
        </div>
      </footer>
    )
};