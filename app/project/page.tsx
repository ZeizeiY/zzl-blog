"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import libs from "./project.json";

// 子分类：id 格式为 父id-序号，parentId 指向父级，便于匹配与回显
type CategoryChild = {
  id: string;
  parentId: string;
  label: string;
  labelEn?: string;
  projects?: string[]; // 添加 projects 字段
  tags?: string[];
};
const publicPath = `/assets/images/project/`;

// 主分类：id 为一级 id，children 为子分类（含 parentId）
type Category = {
  id: string;
  label: string;
  labelEn: string;
  children: CategoryChild[];
};

const categories: Category[] = [
  {
    id: "1",
    label: "四域框架",
    labelEn: "Four-Domain Framework",
    children: [
      {
        id: "1-1",
        parentId: "1",
        label: "话语性设计",
        labelEn: "Discursive Design",
        projects: ["1"],
      },
      {
        id: "1-2",
        parentId: "1",
        label: "实验性设计",
        labelEn: "Experimental Design",
        projects: ["2", "3", "4", "5", "6", "7", "8", "10", "12", "14"],
      },
      {
        id: "1-3",
        parentId: "1",
        label: "责任性设计",
        labelEn: "Responsible Design",
        projects: ["5", "11", "13"],
      },
      {
        id: "1-4",
        parentId: "1",
        label: "商业性设计",
        labelEn: "Commercial Design",
        projects: ["3", "4", "8", "9"],
      },
    ],
  },
  {
    id: "2",
    label: "学科",
    labelEn: "Subject",
    children: [
      {
        id: "2-1",
        parentId: "2",
        label: "工业设计",
        labelEn: "Industrial Design",
      },
      {
        id: "2-2",
        parentId: "2",
        label: "产品服务体系设计",
        labelEn: "Product Service System Design",
        projects: ["1", "3", "4", "7", "8"],
      },
      { id: "2-3", parentId: "2", label: "用户研究", labelEn: "User Research" },
      {
        id: "2-4",
        parentId: "2",
        label: "数字艺术",
        labelEn: "Digital Art",
        projects: ["5", "6", "9", "10", "12"],
      },
      {
        id: "2-5",
        parentId: "2",
        label: "策展",
        labelEn: "Curation",
        projects: ["11", "13"],
      },
      {
        id: "2-6",
        parentId: "2",
        label: "活动组织",
        labelEn: "Events",
        projects: ["11", "13"],
      },
    ],
  },
  {
    id: "3",
    label: "发表",
    labelEn: "Publication",
    children: [
      {
        id: "3-1",
        parentId: "3",
        label: "Ubicomp2024",
        labelEn: "Ubicomp2024",
      },
      {
        id: "3-2",
        parentId: "3",
        label: "CHI2025",
        labelEn: "CHI2025",
        projects: ["5"],
      },
      { id: "3-3", parentId: "3", label: "DIS2025", labelEn: "DIS2025" },
      { id: "3-4", parentId: "3", label: "HCII2026", labelEn: "HCII2026" },
    ],
  },
  {
    id: "4",
    label: "展览",
    labelEn: "Exhibition",
    children: [
      {
        id: "4-1",
        parentId: "4",
        label: "米兰设计周",
        labelEn: "Milan Design Week",
        projects: ["1"],
      },
      {
        id: "4-2",
        parentId: "4",
        label: "荷兰设计周",
        labelEn: "Dutch Design Week",
        projects: ["2"],
      },
      {
        id: "4-3",
        parentId: "4",
        label: "中国杭州艺术与科技国际双年展",
        labelEn: "Hangzhou Art and Technology Biennale",
      },
      {
        id: "4-4",
        parentId: "4",
        label: "上海艺术设计大展",
        labelEn: "Shanghai Design Exhibition",
        projects: ["10", "12"],
      },
      {
        id: "4-5",
        parentId: "4",
        label: "首届CCF中国计算艺术大会计算艺术展",
        labelEn: "CCF Computational Art Exhibition",
        projects: ["12"],
      },
    ],
  },
  {
    id: "5",
    label: "获奖",
    labelEn: "Award",
    children: [
      {
        id: "5-1",
        parentId: "5",
        label: "红点奖（Red Dot）",
        labelEn: "Red Dot",
      },
      {
        id: "5-2",
        parentId: "5",
        label: "iF 设计大奖",
        labelEn: "iF Design Award",
      },
      {
        id: "5-3",
        parentId: "5",
        label: "DIA中国设计智造大奖",
        labelEn: "DIA",
        projects: ["2", "4", "8"],
      },
      {
        id: "5-4",
        parentId: "5",
        label: "中国国际大学生创新大赛金奖",
        labelEn: "Innovation Gold",
        projects: ["3"],
      },
      {
        id: "5-5",
        parentId: "5",
        label: "CCF中国计算艺术大会最佳作品奖",
        labelEn: "CCF Best Work",
      },
      {
        id: "5-6",
        parentId: "5",
        label: "华人华侨人机交互大会最佳作品提名奖",
        labelEn: "CHCI Nomination",
        projects: ["2"],
      },
    ],
  },
  {
    id: "6",
    label: "话题",
    labelEn: "Topic",
    children: [
      {
        id: "6-1",
        parentId: "6",
        label: "机器人",
        labelEn: "",
        projects: ["10", "12"],
      },
      {
        id: "6-2",
        parentId: "6",
        label: "AIGC",
        labelEn: "",
        projects: ["10", "12"],
      },
    ],
  },
  {
    id: "7",
    label: "年份",
    labelEn: "Year",
    children: [
      {
        id: "7-0",
        parentId: "7",
        label: "2026",
        projects: ["11", "13"],
      },
      {
        id: "7-1",
        parentId: "7",
        label: "2025",
        projects: ["5", "11", "12", "13"],
      },
      {
        id: "7-2",
        parentId: "7",
        label: "2024",
        projects: ["1", "4", "7", "8", "9", "11"],
      },
      {
        id: "7-3",
        parentId: "7",
        label: "2023",
        projects: ["2", "3", "6", "10", "11"],
      },
      { id: "7-4", parentId: "7", label: "2022" },
      { id: "7-5", parentId: "7", label: "2021", projects: ["14"] },
    ],
  },
];

// 从 JSON 数据创建项目列表
const projects = libs.map((item) => ({
  id: parseInt(item.id),
  title: item.title,
  titleEn: item.title, // 如果没有单独的英文标题，先用中文
  date: item.date,
  image: item.gallerys?.[0] || "",
  tags: item.tags || [],
  // 这里需要根据项目内容关联分类ID，暂时用空数组
  categoryIds: [] as string[],
  cover: item.cover || "",
}));

export default function ProjectPage() {
  /** 主分类单选：仅当前项黑底高亮 */
  const [selectedParentId, setSelectedParentId] = useState<string | null>("1");
  /** 每个主类下各自选中的多个子分类 id（切换主类后仍保留） */
  const [subjectByParentId, setSubjectByParentId] = useState<
    Record<string, string[]>
  >({});
  /** 当前筛选结果 filteredProjects 中被勾选的项目 id */
  const [activeCategoryIds, setActiveCategoryIds] = useState<string[]>([]);

  const handleReset = () => {
    setSelectedParentId(null);
    setSubjectByParentId({});
    setActiveCategoryIds([]);
  };

  /** 点选主类：切到该项；再点当前已选项则取消主类（子项面板收起） */
  const handleParentCategoryClick = (catId: string) => {
    setSelectedParentId((prev) => (prev === catId ? null : catId));
  };

  /** 在当前主类下多选子分类：再点同一项则取消 */
  const toggleSubjectId = (subId: string) => {
    if (selectedParentId == null) return;
    setSubjectByParentId((prev) => {
      const cur = prev[selectedParentId] ?? [];
      if (cur.includes(subId)) {
        const nextValues = cur.filter((id) => id !== subId);
        if (nextValues.length === 0) {
          const next = { ...prev };
          delete next[selectedParentId];
          return next;
        }
        return { ...prev, [selectedParentId]: nextValues };
      }
      return { ...prev, [selectedParentId]: [...cur, subId] };
    });
  };

  const toggleFilteredProjectId = (projectId: string) => {
    setActiveCategoryIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getAllSelectedIds = () => [
    ...(selectedParentId != null ? [selectedParentId] : []),
    ...Object.values(subjectByParentId).flat(),
    ...activeCategoryIds,
  ];

  const getProjectIdsFromSelected = () => {
    const recordedSubjectIds = Object.values(subjectByParentId)
      .flat()
      .filter(Boolean);
    if (recordedSubjectIds.length > 0) {
      const projectIds = new Set<string>();
      recordedSubjectIds.forEach((subId) => {
        categories.forEach((cat) => {
          const child = cat.children.find((c) => c.id === subId);
          if (child?.projects) {
            child.projects.forEach((id) => projectIds.add(id));
          }
        });
      });
      return Array.from(projectIds);
    }

    if (selectedParentId != null) {
      const projectIds = new Set<string>();
      const cat = categories.find((c) => c.id === selectedParentId);
      cat?.children.forEach((child) => {
        if (child.projects) {
          child.projects.forEach((id) => projectIds.add(id));
        }
      });
      return Array.from(projectIds);
    }

    return projects.map((p) => p.id.toString());
  };

  const filteredProjects = useMemo(() => {
    const selectedProjectIds = getProjectIdsFromSelected();
    return projects.filter((project) =>
      selectedProjectIds.includes(project.id.toString())
    );
  }, [selectedParentId, subjectByParentId]);

  const filteredProjectIdSet = useMemo(
    () => new Set(filteredProjects.map((p) => p.id.toString())),
    [filteredProjects]
  );

  useEffect(() => {
    setActiveCategoryIds((prev) =>
      prev.filter((id) => filteredProjectIdSet.has(id))
    );
  }, [filteredProjectIdSet]);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-12">
      <h1 className="mb-10 text-3xl font-bold">
        项目分类 / Project Categories
      </h1>

      <div className="relative mb-4">
        <div className="relative flex flex-wrap items-start gap-3">
          {categories.map((cat) => {
            const isSelected = selectedParentId === cat.id;
            const subIdsForCat = subjectByParentId[cat.id] ?? [];
            const pickedSummary =
              subIdsForCat.length > 0
                ? cat.children
                    .filter((s) => subIdsForCat.includes(s.id))
                    .map((s) => s.label)
                    .join("、")
                : null;
            return (
              <div
                key={cat.id}
                className="flex max-w-[11rem] flex-col items-center gap-1.5"
              >
                <button
                  type="button"
                  onClick={() => handleParentCategoryClick(cat.id)}
                  className={`flex h-[70px] w-[176px] cursor-pointer items-center justify-center gap-1.5 rounded border px-4 py-2 transition-colors ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white hover:border-black"
                  }`}
                >
                  <span className="flex flex-col items-center text-center">
                    <span className="text-sm">{cat.label}</span>
                    <span
                      className={`text-xs ${isSelected ? "text-white/90" : "text-gray-500"}`}
                    >
                      {cat.labelEn}
                    </span>
                  </span>
                </button>
                {pickedSummary != null && (
                  <p className="w-full px-0.5 text-center text-[14px] leading-snug text-gray-600">
                    {pickedSummary}
                  </p>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={handleReset}
            className="order-last mt-2 flex h-[56px] w-full cursor-pointer flex-col items-center justify-center rounded border border-gray-300 px-4 transition-colors hover:border-black md:absolute md:right-[85px] md:top-0 md:mt-0 md:h-[70px] md:w-auto md:self-center"
          >
            <span className="block text-sm">重置</span>
            <span className="block text-xs text-gray-500">Reset</span>
          </button>
        </div>
      </div>

      {selectedParentId != null &&
        (() => {
          const cat = categories.find((c) => c.id === selectedParentId);
          if (!cat || cat.children.length === 0) return null;
          return (
            <div className="mb-8 space-y-10 border-l-2 border-black pl-4">
              <div key={selectedParentId}>
                <div className="flex flex-wrap items-center gap-2">
                  {cat.children.map((sub) => {
                    const isSelected = (
                      subjectByParentId[selectedParentId] ?? []
                    ).includes(sub.id);
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => toggleSubjectId(sub.id)}
                        className={`flex cursor-pointer items-center gap-1.5 rounded border px-3 py-1.5 text-sm transition-colors ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-gray-300 bg-white hover:border-black"
                        }`}
                      >
                        <span className="text-left">
                          {sub.label}
                          {sub.labelEn != null && sub.labelEn !== "" && (
                            <span
                              className={`ml-1 text-xs ${isSelected ? "opacity-80" : "opacity-70"}`}
                            >
                              {sub.labelEn}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

      {/* 项目网格：按选中的主分类/子分类 id 匹配回显 */}
      {filteredProjects.length > 0 ? (
        <div
          key={`${selectedParentId ?? ""}-${JSON.stringify(subjectByParentId)}-${activeCategoryIds.join(",")}`}
          className="grid grid-cols-1 gap-10 md:grid-cols-2"
        >
          {filteredProjects.map((project, index) => {
            const pid = project.id.toString();
            const isProjectPicked = activeCategoryIds.includes(pid);
            return (
              <div
                key={project.id}
                className={`animate-fade-in relative opacity-0 ${
                  isProjectPicked ? "ring-2 ring-black ring-offset-2" : ""
                }`}
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <Link
                  href={`/project/${project.id}`}
                  onClick={() => {
                    localStorage.setItem(
                      "projectItem",
                      JSON.stringify(
                        libs.find((item: any) => item.id == project.id)
                      )
                    );
                  }}
                  className="group flex flex-col border border-black"
                >
                  {/* 项目图片 */}
                  <div className="relative aspect-[3/2] overflow-hidden border-b border-black">
                    {project?.cover ? (
                      <Image
                        src={`${publicPath}${project.id}/${project.cover}`}
                        fill
                        alt={project.title}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                        <svg
                          className="h-16 w-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                  </div>

                  {/* 项目信息 */}
                  <div className="flex flex-col bg-white p-6">
                    <div className="flex flex-col space-y-0.5">
                      <h3 className="font-hanyi h-[55px] text-[22px] font-bold leading-tight text-black">
                        {project.title}
                      </h3>
                    </div>

                    {/* 标签 */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {/* 年份标签 */}
                      {project?.tags?.length > 0 &&
                        project?.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="rounded-[2px] bg-black px-4 py-1 text-[11px] font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500">
          没有找到匹配的项目
        </div>
      )}
    </div>
  );
}
