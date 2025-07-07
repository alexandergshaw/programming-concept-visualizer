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
                  { code: 'let message = $(&quot;#greeting&quot;).text();     // Get text' },
                  { code: '$(&quot;#greeting&quot;).text(&quot;Hello!&quot;);          // Change text' },
                  { code: '' },
                  { code: '// Get or change HTML' },
                  { code: 'let content = $(&quot;#info&quot;).html();        // Get HTML' },
                  { code: '$(&quot;#info&quot;).html(&quot;&lt;b&gt;Important!&lt;/b&gt;&quot;);  // Change HTML' }
                ]}
                language="javascript"
              />
            </div>
            <div>
              <h4 className="font-semibold">Change Settings:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Change image source' },
                  { code: '$(&quot;img&quot;).attr(&quot;src&quot;, &quot;new-pic.jpg&quot;);' },
                  { code: '' },
                  { code: '// Check or change checkboxes' },
                  { code: 'let isChecked = $(&quot;#terms&quot;).prop(&quot;checked&quot;);' },
                  { code: '$(&quot;#terms&quot;).prop(&quot;checked&quot;, true);' }
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
                  { code: '$(&quot;&lt;p&gt;New text&lt;/p&gt;&quot;).appendTo(&quot;#container&quot;);' },
                  { code: '' },
                  { code: '// Add things in different spots' },
                  { code: '$(&quot;p&quot;).before(&quot;&lt;hr&gt;&quot;);         // Add before' },
                  { code: '$(&quot;p&quot;).after(&quot;&lt;hr&gt;&quot;);          // Add after' },
                  { code: '$(&quot;div&quot;).prepend(&quot;Start&quot;);     // Add at start' },
                  { code: '$(&quot;div&quot;).append(&quot;End&quot;);        // Add at end' }
                ]}
                language="javascript"
              />
            </div>
            <div>
              <h4 className="font-semibold">Remove Things:</h4>
              <CodeSnippet
                lines={[
                  { code: '// Remove elements completely' },
                  { code: '$(&quot;.old-stuff&quot;).remove();' },
                  { code: '' },
                  { code: '// Empty a container' },
                  { code: '$(&quot;#container&quot;).empty();' },
                  { code: '' },
                  { code: '// Replace something' },
                  { code: '$(&quot;p&quot;).replaceWith(&quot;&lt;div&gt;New&lt;/div&gt;&quot;);' }
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
                  { code: '$(&quot;div&quot;).addClass(&quot;highlight&quot;);' },
                  { code: '$(&quot;div&quot;).removeClass(&quot;old&quot;);' },
                  { code: '' },
                  { code: '// Toggle a class (add/remove)' },
                  { code: '$(&quot;div&quot;).toggleClass(&quot;active&quot;);' },
                  { code: '' },
                  { code: '// Check for a class' },
                  { code: 'if ($(&quot;div&quot;).hasClass(&quot;important&quot;)) {' },
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
                  { code: '$(&quot;p&quot;).css(&quot;color&quot;, &quot;blue&quot;);' },
                  { code: '' },
                  { code: '// Change many styles at once' },
                  { code: '$(&quot;div&quot;).css({' },
                  { code: '  &quot;background&quot;: &quot;yellow&quot;,' },
                  { code: '  &quot;padding&quot;: &quot;10px&quot;,' },
                  { code: '  &quot;border&quot;: &quot;1px solid black&quot;' },
                  { code: '});' }
                ]}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <p className="text-yellow-700">
              <strong>Speed Tip:</strong> When changing many things at once, save your jQuery selection in a
              variable. For example: <code>let menu = $(&quot;#menu&quot;);</code> then use <code>menu</code> instead
              of searching for it again.
            </p>
          </div>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
} 