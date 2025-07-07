import CodeSnippet from '../../common/CodeSnippet';
import Section from '../../common/Section';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '../../common/TableOfContents';

export default function JQueryDomManipulation() {
  return (
    <ConceptWrapper
      title="jQuery DOM Manipulation"
      description="Learn how to use jQuery to change, add, remove, and style elements on your webpage"
    >
      <p>
        jQuery makes it easy to change your webpage. Here's how to do common tasks like changing text,
        adding new elements, and styling things.
      </p>


      <TableOfContents numbered>
        <Section title="Video Overview">
          <div style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingTop: '56.25%',
            paddingBottom: 0,
            boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
            marginTop: '1.6em',
            marginBottom: '0.9em',
            overflow: 'hidden',
            borderRadius: '8px',
            willChange: 'transform'
          }}>
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0
              }}
              src="https://www.canva.com/design/DAGscVDVmLE/pYjULB3gTzUmzdwBM1PC5g/watch?embed"
              allowFullScreen
              allow="fullscreen"
            >
            </iframe>
          </div>
        </Section>
        <Section title="Changing Content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="font-semibold">Change Text and HTML:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Get or change text' },
                  { code: 'let message = $("#greeting").text();     // Get text' },
                  { code: '$("#greeting").text("Hello!");          // Change text' },
                  { code: '' },
                  { code: '// Get or change HTML' },
                  { code: 'let content = $("#info").html();        // Get HTML' },
                  { code: '$("#info").html("<b>Important!</b>");  // Change HTML' }
                ]}
                language="javascript"
              />
            </div>
            <div>
              <h4 className="font-semibold">Change Settings:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Change image source' },
                  { code: '$("img").attr("src", "new-pic.jpg");' },
                  { code: '' },
                  { code: '// Check or change checkboxes' },
                  { code: 'let isChecked = $("#terms").prop("checked");' },
                  { code: '$("#terms").prop("checked", true);' }
                ]}
                language="javascript"
              />
            </div>
          </div>
        </Section>

        <Section title="Adding and Removing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="font-semibold">Add New Things:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Add a new paragraph' },
                  { code: '$("<p>New text</p>").appendTo("#container");' },
                  { code: '' },
                  { code: '// Add things in different spots' },
                  { code: '$("p").before("<hr>");         // Add before' },
                  { code: '$("p").after("<hr>");          // Add after' },
                  { code: '$("div").prepend("Start");     // Add at start' },
                  { code: '$("div").append("End");        // Add at end' }
                ]}
                language="javascript"
              />
            </div>
            <div>
              <h4 className="font-semibold">Remove Things:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Remove elements completely' },
                  { code: '$(".old-stuff").remove();' },
                  { code: '' },
                  { code: '// Empty a container' },
                  { code: '$("#container").empty();' },
                  { code: '' },
                  { code: '// Replace something' },
                  { code: '$("p").replaceWith("<div>New</div>");' }
                ]}
                language="javascript"
              />
            </div>
          </div>
        </Section>

        <Section title="Styling Things">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="font-semibold">Using Classes:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Add or remove classes' },
                  { code: '$("div").addClass("highlight");' },
                  { code: '$("div").removeClass("old");' },
                  { code: '' },
                  { code: '// Toggle a class (add/remove)' },
                  { code: '$("div").toggleClass("active");' },
                  { code: '' },
                  { code: '// Check for a class' },
                  { code: 'if ($("div").hasClass("important")) {' },
                  { code: '  // Do something' },
                  { code: '}' }
                ]}
                language="javascript"
              />
            </div>
            <div>
              <h4 className="font-semibold">Direct Styling:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Change one style' },
                  { code: '$("p").css("color", "blue");' },
                  { code: '' },
                  { code: '// Change many styles at once' },
                  { code: '$("div").css({' },
                  { code: '  "background": "yellow",' },
                  { code: '  "padding": "10px",' },
                  { code: '  "border": "1px solid black"' },
                  { code: '});' }
                ]}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <p className="text-yellow-700">
              <strong>Speed Tip:</strong> When changing many things at once, save your jQuery selection in a
              variable. For example: <code>let menu = $("#menu");</code> then use <code>menu</code> instead
              of searching for it again.
            </p>
          </div>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
} 