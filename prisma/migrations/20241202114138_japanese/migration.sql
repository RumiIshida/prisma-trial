BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[投稿] (
    [id] INT NOT NULL IDENTITY(1,1),
    [タイトル] NVARCHAR(255) NOT NULL,
    [作成日] DATETIME NOT NULL CONSTRAINT [投稿_作成日_df] DEFAULT CURRENT_TIMESTAMP,
    [内容] NVARCHAR(max),
    [公開] BIT NOT NULL CONSTRAINT [投稿_公開_df] DEFAULT 0,
    [投稿者ID] INT NOT NULL,
    CONSTRAINT [投稿_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[プロフィール] (
    [id] INT NOT NULL IDENTITY(1,1),
    [bio] NVARCHAR(1000),
    [userId] INT NOT NULL,
    CONSTRAINT [プロフィール_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [プロフィール_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[ユーザー] (
    [id] INT NOT NULL IDENTITY(1,1),
    [名前] NVARCHAR(255),
    [メールアドレス] VARCHAR(255) NOT NULL,
    CONSTRAINT [ユーザー_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ユーザー_メールアドレス_key] UNIQUE NONCLUSTERED ([メールアドレス])
);

-- AddForeignKey
ALTER TABLE [dbo].[投稿] ADD CONSTRAINT [投稿_投稿者ID_fkey] FOREIGN KEY ([投稿者ID]) REFERENCES [dbo].[ユーザー]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[プロフィール] ADD CONSTRAINT [プロフィール_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[ユーザー]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
