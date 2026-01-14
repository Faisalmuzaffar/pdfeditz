import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getToolById, getAllTools } from '@/config/tools';
import { getToolContent, type Locale } from '@/config/tool-content';
import { ToolPage } from '@/components/tools/ToolPage';
import { EditPDFTool } from '@/components/tools/edit-pdf';
import { SignPDFTool } from '@/components/tools/sign';
import { CropPDFTool } from '@/components/tools/crop';
import { BookmarkTool } from '@/components/tools/bookmark';
import { PageNumbersTool } from '@/components/tools/page-numbers';
import { WatermarkTool } from '@/components/tools/watermark';
import { HeaderFooterTool } from '@/components/tools/header-footer';
import { InvertColorsTool } from '@/components/tools/invert-colors';
import { BackgroundColorTool } from '@/components/tools/background-color';
import { StampsTool } from '@/components/tools/stamps';
import { RemoveAnnotationsTool } from '@/components/tools/remove-annotations';
import { FormFillerTool } from '@/components/tools/form-filler';
import { FormCreatorTool } from '@/components/tools/form-creator';
import { RemoveBlankPagesTool } from '@/components/tools/remove-blank-pages';
import { TableOfContentsTool } from '@/components/tools/table-of-contents';
import { TextColorTool } from '@/components/tools/text-color';
import { generateToolMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateSoftwareApplicationSchema,
  generateFAQPageSchema,
  generateHowToSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema
} from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

const SUPPORTED_LOCALES: Locale[] = ['en', 'ja', 'ko', 'es', 'fr', 'de', 'zh', 'pt'];

interface ToolPageParams {
  params: Promise<{
    locale: string;
    tool: string;
  }>;
}

/**
 * Generate static params for all tool pages
 */
export async function generateStaticParams() {
  const tools = getAllTools();

  return SUPPORTED_LOCALES.flatMap(locale =>
    tools.map(tool => ({
      locale,
      tool: tool.slug,
    }))
  );
}

/**
 * Generate metadata for tool pages
 */
export async function generateMetadata({ params }: ToolPageParams): Promise<Metadata> {
  const { locale: localeParam, tool: toolSlug } = await params;
  const locale = localeParam as Locale;
  const tool = getToolById(toolSlug);
  const t = await getTranslations({ locale, namespace: 'errors' });

  if (!tool) {
    return {
      title: t('toolNotFound'),
    };
  }

  const content = getToolContent(locale, tool.id);

  if (!content) {
    return {
      title: tool.id,
    };
  }

  return generateToolMetadata({
    tool,
    content,
    locale,
    path: `/tools/${toolSlug}`,
  });
}

/**
 * Tool Page Component
 * Renders the appropriate tool interface based on the tool slug
 */
export default async function ToolPageRoute({ params }: ToolPageParams) {
  const { locale: localeParam, tool: toolSlug } = await params;
  const locale = localeParam as Locale;

  // Enable static rendering for this locale - MUST be called before getTranslations
  setRequestLocale(locale);

  const t = await getTranslations();

  // Get tool data
  const tool = getToolById(toolSlug);

  if (!tool) {
    notFound();
  }

  // Get tool content for the locale (falls back to English)
  const content = getToolContent(locale, tool.id);

  if (!content) {
    notFound();
  }

  // Generate structured data
  const toolStructuredData = generateSoftwareApplicationSchema(tool, content, locale);
  const faqStructuredData = content.faq && content.faq.length > 0
    ? generateFAQPageSchema(content.faq)
    : null;
  const howToStructuredData = generateHowToSchema(tool, content, locale);
  const webPageStructuredData = generateWebPageSchema(tool, content, locale);
  const breadcrumbStructuredData = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Tools', path: '/tools' },
      { name: content.title, path: `/tools/${tool.slug}` },
    ],
    locale
  );

  // Prepare localized content for related tools
  const localizedRelatedTools = tool.relatedTools.reduce((acc, relatedId) => {
    const relatedContent = getToolContent(locale, relatedId);
    if (relatedContent) {
      acc[relatedId] = {
        title: relatedContent.title,
        description: relatedContent.metaDescription
      };
    }
    return acc;
  }, {} as Record<string, { title: string; description: string }>);

  // Render the appropriate tool interface
  const renderToolInterface = () => {
    switch (tool.id) {
      case 'edit-pdf':
        return <EditPDFTool />;
      case 'sign-pdf':
        return <SignPDFTool />;
      case 'crop-pdf':
        return <CropPDFTool />;
      case 'bookmark':
        return <BookmarkTool />;
      case 'table-of-contents':
        return <TableOfContentsTool />;
      case 'page-numbers':
        return <PageNumbersTool />;
      case 'add-watermark':
        return <WatermarkTool />;
      case 'header-footer':
        return <HeaderFooterTool />;
      case 'invert-colors':
        return <InvertColorsTool />;
      case 'background-color':
        return <BackgroundColorTool />;
      case 'text-color':
        return <TextColorTool />;
      case 'add-stamps':
        return <StampsTool />;
      case 'remove-annotations':
        return <RemoveAnnotationsTool />;
      case 'form-filler':
        return <FormFillerTool />;
      case 'form-creator':
        return <FormCreatorTool />;
      case 'remove-blank-pages':
        return <RemoveBlankPagesTool />;
      default:
        return (
          <div className="p-8 text-center text-[hsl(var(--color-muted-foreground))]">
            <p>{t('tools.comingSoon')}</p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={toolStructuredData} />
      <JsonLd data={webPageStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      {faqStructuredData && <JsonLd data={faqStructuredData} />}
      {howToStructuredData && <JsonLd data={howToStructuredData} />}

      {/* Tool Page */}
      <ToolPage
        tool={tool}
        content={content}
        locale={locale}
        localizedRelatedTools={localizedRelatedTools}
      >
        {renderToolInterface()}
      </ToolPage>
    </>
  );
}
