import '../../../styles/javascript.css';
import Sidebar from './Sidebar';

const concepts = ["Arrays", "Objects", "Loops", "Functions", "Conditionals"];

export default function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  return (
    <main className="js-layout">
      <Sidebar
        title={params.language}
        items={concepts}
        onSelect={(concept: string) => {
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('concept', concept.toLowerCase());
            window.history.pushState({}, '', url);
            window.dispatchEvent(new Event('popstate'));
          }
        }}
      />
      <section className="js-content">
        {children}
      </section>
    </main>
  );
}
